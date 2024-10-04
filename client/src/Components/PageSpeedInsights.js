import React, { useState } from 'react';

const PageSpeedInsights = () => {
  const [url, setUrl] = useState('');
  const [initialContent, setInitialContent] = useState(null);
  const [cruxMetrics, setCruxMetrics] = useState([]);
  const [lighthouseMetrics, setLighthouseMetrics] = useState([]);
  const [error, setError] = useState(null);

  const setUpQuery = () => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
      url: url, // The API expects the URL unencoded in the query string
      key: 'api key', // Replace with your actual API key if required
    };
    const query = new URL(api);
    Object.keys(parameters).forEach((key) =>
      query.searchParams.append(key, parameters[key])
    );
    return query.toString();
  };

  const runPageSpeed = async () => {
    const queryUrl = setUpQuery();
    try {
      const response = await fetch(queryUrl);
      const json = await response.json();

      if (response.ok) {
        setInitialContent(json.id);

        // Handle loadingExperience metrics
        const loadingExperience = json.loadingExperience;
        const cruxMetricsArray = [];
        if (loadingExperience && loadingExperience.metrics) {
          for (const [key, metric] of Object.entries(loadingExperience.metrics)) {
            cruxMetricsArray.push({
              name: key,
              category: metric.category,
              percentile: metric.percentile,
            });
          }
        }
        setCruxMetrics(cruxMetricsArray);

        // Handle lighthouseResult audits
        const lighthouse = json.lighthouseResult;
        const lighthouseMetricsArray = [];
        if (lighthouse && lighthouse.audits) {
          const desiredMetrics = [
            'first-contentful-paint',
            'speed-index',
            'interactive',
            'first-cpu-idle',
            'estimated-input-latency',
          ];

          desiredMetrics.forEach((metricKey) => {
            const audit = lighthouse.audits[metricKey];
            if (audit) {
              lighthouseMetricsArray.push({
                title: audit.title,
                displayValue: audit.displayValue || 'N/A',
                score: audit.score !== null ? audit.score * 100 : 'N/A', // Scores are between 0 and 1
              });
            }
          });
        }
        setLighthouseMetrics(lighthouseMetricsArray);

        setError(null);
      } else {
        setError(json.error ? json.error.message : 'Error fetching data');
      }
    } catch (err) {
      console.error('Error fetching PageSpeed Insights data:', err);
      setError('Error fetching PageSpeed Insights data. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runPageSpeed();
  };

  return (
    <div>
      <h1>PageSpeed Insights API Demo</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Website URL:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://example.com"
          />
        </label>
        <button type="submit">Check Performance</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {initialContent && <p>Page tested: {initialContent}</p>}

      {cruxMetrics.length > 0 && (
        <>
          <h2>Chrome User Experience Report Results</h2>
          {cruxMetrics.map((metric) => (
            <p key={metric.name}>
              <strong>{metric.name.replace(/_/g, ' ')}:</strong> {metric.category} (Percentile: {metric.percentile})
            </p>
          ))}
        </>
      )}

      {lighthouseMetrics.length > 0 && (
        <>
          <h2>Lighthouse Results</h2>
          {lighthouseMetrics.map((metric) => (
            <p key={metric.title}>
              <strong>{metric.title}:</strong> {metric.displayValue} (Score: {metric.score})
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default PageSpeedInsights;

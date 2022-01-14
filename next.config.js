const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

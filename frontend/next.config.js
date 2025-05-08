/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'ru', 'kg'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  images: { remotePatterns: [{ hostname: 'localhost' }] },
  webpack: (config, { _ }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Swiper CSS import causes issues with inline assets
    // https://github.com/vercel/next.js/issues/34501#issuecomment-1046655345
    if (config.module.generator?.asset?.filename) {
      if (!config.module.generator['asset/resource']) {
        config.module.generator['asset/resource'] =
          config.module.generator.asset;
      }
      delete config.module.generator.asset;
    }

    return config;
  },
};

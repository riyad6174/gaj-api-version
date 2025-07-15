const BASE_URL = 'https://www.gajretreat.com/';
const API_URL_BLOGS =
  'https://www.api.gajretreat.com/api/v1/frontend/data/blog-list';
const API_URL_SUB_PAGES =
  'https://www.api.gajretreat.com/api/v1/frontend/data/sub-page-slugs';
const API_URL_ITINERARIES =
  'https://www.api.gajretreat.com/api/v1/frontend/data/signature-itinerary-child';

// Function to escape XML special characters
function encodeXML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Function to parse publishDate (e.g., "2025-05-09T17:26:50.000000Z") to ISO format
function parsePublishDate(dateStr) {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date format: ${dateStr}, using current date`);
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch (error) {
    console.warn(`Error parsing date: ${dateStr}, error: ${error.message}`);
    return new Date().toISOString();
  }
}

// Function to fetch all blog posts from the API
async function fetchAllBlogs() {
  let allBlogs = [];
  let currentPage = 1;
  let lastPage = 1;

  console.log('Starting to fetch blogs...');

  try {
    do {
      const response = await fetch(`${API_URL_BLOGS}?page=${currentPage}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        console.error(
          `HTTP error on page ${currentPage}! Status: ${response.status}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data?.data)) {
        allBlogs = [...allBlogs, ...data.data.data];
        lastPage = data.data.last_page || 1;
        console.log(
          `Fetched ${data.data.data.length} blogs from page ${currentPage}, total blogs: ${allBlogs.length}`
        );
        currentPage++;
      } else {
        console.error(
          `API request failed or invalid data on page ${currentPage}:`,
          data.message || 'No success or data field'
        );
        break;
      }
    } while (currentPage <= lastPage);

    return allBlogs;
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    return [];
  }
}

// Function to fetch sub-page slugs
async function fetchSubPageSlugs() {
  try {
    const response = await fetch(API_URL_SUB_PAGES, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(
        `HTTP error fetching sub-page slugs! Status: ${response.status}`
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && Array.isArray(data.data)) {
      console.log(`Fetched ${data.data.length} sub-page slugs`);
      return data.data;
    } else {
      console.error(
        'API request failed or invalid sub-page slugs data:',
        data.message || 'No success or data field'
      );
      return [];
    }
  } catch (error) {
    console.error('Error fetching sub-page slugs:', error.message);
    return [];
  }
}

// Function to fetch itinerary child slugs
async function fetchItinerarySlugs() {
  try {
    const response = await fetch(API_URL_ITINERARIES, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(
        `HTTP error fetching itinerary slugs! Status: ${response.status}`
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && Array.isArray(data.data?.data)) {
      console.log(`Fetched ${data.data.data.length} itinerary slugs`);
      return data.data.data;
    } else {
      console.error(
        'API request failed or invalid itinerary slugs data:',
        data.message || 'No success or data field'
      );
      return [];
    }
  } catch (error) {
    console.error('Error fetching itinerary slugs:', error.message);
    return [];
  }
}

// Function to validate slug
function isValidSlug(slug) {
  return (
    typeof slug === 'string' && slug.trim() !== '' && !/[<>&"']/.test(slug)
  );
}

// Function to generate the XML sitemap
async function generateSiteMap() {
  const staticPages = [
    { url: `${BASE_URL}`, changefreq: 'daily', priority: 1.0 },
    { url: `${BASE_URL}accommodation`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}dining`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}events/weddings`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}testimonials`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}resort-policies`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}privacy-policy`, changefreq: 'monthly', priority: 0.8 },
    {
      url: `${BASE_URL}plan-your-events`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    { url: `${BASE_URL}activities`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}offers`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}contact`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}gallery`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}about-us`, changefreq: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}blog`, changefreq: 'weekly', priority: 0.8 },
  ];

  // Fetch dynamic data
  const blogs = await fetchAllBlogs();
  const subPageSlugs = await fetchSubPageSlugs();
  const itinerarySlugs = await fetchItinerarySlugs();

  if (blogs.length === 0) {
    console.warn('No blogs were fetched. Check API response or connectivity.');
  } else {
    console.log(
      'Blogs to include in sitemap:',
      blogs.map((blog) => ({
        slug: blog.slug,
        created_at: blog.created_at,
      }))
    );
  }

  if (subPageSlugs.length === 0) {
    console.warn(
      'No sub-page slugs were fetched. Check API response or connectivity.'
    );
  } else {
    console.log('Sub-page slugs to include in sitemap:', subPageSlugs);
  }

  if (itinerarySlugs.length === 0) {
    console.warn(
      'No itinerary slugs were fetched. Check API response or connectivity.'
    );
  } else {
    console.log(
      'Itinerary slugs to include in sitemap:',
      itinerarySlugs.map((itinerary) => ({
        slug: itinerary.slug,
        created_at: itinerary.created_at,
      }))
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      ({ url, changefreq, priority }) => `
      <url>
        <loc>${encodeXML(url)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `
    )
    .join('')}
  ${blogs
    .map(({ slug, created_at }, index) => {
      if (!isValidSlug(slug) || !created_at) {
        console.warn(
          `Skipping blog #${index} with invalid slug or missing created_at:`,
          {
            slug,
            created_at,
          }
        );
        return '';
      }
      const url = `${BASE_URL}blog/${slug}`;
      console.log(`Including blog URL: ${url}`);
      return `
      <url>
        <loc>${encodeXML(url)}</loc>
        <lastmod>${parsePublishDate(created_at)}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
    })
    .join('')}
  ${subPageSlugs
    .map((slug, index) => {
      if (!isValidSlug(slug)) {
        console.warn(`Skipping sub-page #${index} with invalid slug:`, {
          slug,
        });
        return '';
      }
      const url = `${BASE_URL}${slug.startsWith('/') ? slug.slice(1) : slug}`;
      console.log(`Including sub-page URL: ${url}`);
      return `
      <url>
        <loc>${encodeXML(url)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
    })
    .join('')}
  ${itinerarySlugs
    .map(({ slug, created_at }, index) => {
      if (!isValidSlug(slug) || !created_at) {
        console.warn(
          `Skipping itinerary #${index} with invalid slug or missing created_at:`,
          {
            slug,
            created_at,
          }
        );
        return '';
      }
      const url = `${BASE_URL}itineraries/${slug}`;
      console.log(`Including itinerary URL: ${url}`);
      return `
      <url>
        <loc>${encodeXML(url)}</loc>
        <lastmod>${parsePublishDate(created_at)}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
    })
    .join('')}
</urlset>`;
}

// Empty component, as the response is handled by getServerSideProps
function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  try {
    // Generate the XML sitemap
    const sitemap = await generateSiteMap();

    // Set response headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=7200'
    ); // Cache for 1 hour, revalidate for 2 hours

    // Log the generated sitemap for debugging

    // Send the XML response
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
    res.statusCode = 500;
    res.end('Error generating sitemap');
    return { props: {} };
  }
}

export default SiteMap;

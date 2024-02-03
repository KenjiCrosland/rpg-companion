import fetch from 'node-fetch';

const CLIENT_ID = process.env.PATREON_CLIENT_ID;
const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET;
const CAMPAIGN_ID = process.env.PATREON_CAMPAIGN_ID;
const TIER_ID = process.env.PATREON_TIER_ID;
const redirectURL = 'http://localhost:3000/patreon-oauth';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const oauthGrantCode = query.code as string;
  const getPatreonAccessToken = async () => {
    const response = await fetch('https://www.patreon.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: oauthGrantCode,
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: 'identity%20identity%5Bemail%5D',
        redirect_uri: redirectURL,
      }),
    });
    const data = await response.json();
    return data;
  };
  const accessData = await getPatreonAccessToken();

  const patreonAPIClient = async () => {
    const response = await fetch(
      'https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers,memberships.campaign&fields%5Bmember%5D=currently_entitled_amount_cents&fields%5Buser%5D=email,first_name,full_name,last_name,is_email_verified&fields%5Btier%5D=title',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessData.access_token}`,
        },
      },
    );
    const data = await response.json();
    return data;
  };
  
  const userData = await patreonAPIClient();
  console.log(userData);
  function containsMasterWorldshaperTier(obj): boolean {
    // Destructure to get the 'included' array directly from the object
    if (!obj.included) return false;
    const { included } = obj;

    // Use some() to check if any object in 'included' matches your criteria
    return included.some(
      (item) =>
        item.attributes.title === 'Master Worldshaper' &&
        item.id === TIER_ID &&
        item.type === 'tier',
    );
  }
  console.log('WELCOME PATRON!', containsMasterWorldshaperTier(userData));

  return sendRedirect(event, '/');
});

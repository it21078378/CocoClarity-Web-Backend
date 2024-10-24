import { TwitterApi } from 'twitter-api-v2';

export const fetchTweets = async (req, res) => {
  try {
    // Initialize the Twitter client with your Bearer Token from environment variables
    const client = new TwitterApi(process.env.BEARER_TOKEN);
    
    // Define the search query
    const query = 'coconut oil';

    // Make the request to search recent tweets with the specified query
    const response = await client.v2.search(query, {
      'tweet.fields': ['created_at'],
      max_results: 10,
    });

    // Extract the tweet texts from the response
    const tweets = response.data || [];
    
    // Send the tweets as a JSON response
    res.status(200).json({ tweets });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
};

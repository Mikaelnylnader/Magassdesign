const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;

export async function getInstagramFeed(limit = 4) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_TOKEN}&limit=${limit}`
    );
    const data = await response.json();
    
    if (data.error) {
      console.error('Instagram API Error:', data.error);
      return null;
    }

    return data.data.map(post => ({
      id: post.id,
      image: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      caption: post.caption,
      url: post.permalink,
      timestamp: post.timestamp
    }));
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return null;
  }
} 
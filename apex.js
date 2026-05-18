// Fetches the top 10 stories from Hacker News and prints them.
// Run with:  node apex.js

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

async function getTopStories(count = 10) {
    const ids = await fetch(TOP_STORIES_URL).then(r => r.json());
    const topIds = ids.slice(0, count);

    const stories = await Promise.all(
        topIds.map(id => fetch(ITEM_URL(id)).then(r => r.json()))
    );

    return stories.map(s => ({
        title: s.title,
        score: s.score,
        author: s.by,
        comments: s.descendants,
        url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
    }));
}

const stories = await getTopStories();
for (const s of stories) {
    console.log(`[${s.score} up, ${s.comments} comments] ${s.title}`);
    console.log(`   by ${s.author} -> ${s.url}\n`);
}

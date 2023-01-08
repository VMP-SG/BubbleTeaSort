export const getCommitsData = (posts) => {
  const commitsData = []
  posts.forEach(post => {
    const dateString = new Date(post.timestamp.seconds * 1000).toLocaleDateString("en-GB").split("/").reverse().join("-")
    const index = commitsData.findIndex((commitData) => commitData.date = dateString)
    if (index === -1) {
      commitsData.push({ date: dateString, count: 1 });
    } else {
      commitsData[index].count++;
    }
  });
  return commitsData;
}

export const getCupsInPastMonth = (posts) => {
  console.log(posts);
  const pastMonthPosts = posts.filter(post => {
  })
}

// import { getDocs, collection } from "firebase/firestore";
// import { db } from "./firebase";
import stores from "../data/stores.json";

export const getCommitsData = (posts) => {
  const commitsData = [];
  posts.forEach((post) => {
    const dateString = post.timestamp
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-");

    const index = commitsData.findIndex(
      (commitData) => commitData.date === dateString
    );
    if (index === -1) {
      commitsData.push({ date: dateString, count: post.flavours.length });
    } else {
      commitsData[index].count += post.flavours.length;
    }
  });
  return commitsData;
};

const getPastMonthPosts = (posts) => {
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  const pastMonthPosts = posts.filter(
    (post) => post.timestamp.getTime() >= lastMonthDate.getTime()
  );
  return pastMonthPosts;
};

export const getCupsInPastMonth = (posts) => {
  const pastMonthPosts = getPastMonthPosts(posts);
  let cupCount = 0;
  pastMonthPosts.forEach((post) => (cupCount += post.flavours.length));
  return cupCount;
};

export const getSpendingInPastMonth = (posts) => {
  const pastMonthPosts = getPastMonthPosts(posts);
  let spending = 0;
  pastMonthPosts.forEach((post) => (spending += post.price));
  return spending.toFixed(2);
};

export const getActivityPercentagesAndLabels = async (posts) => {
  const storesPercentage = [];
  const postsLength = posts.length;

  posts.forEach((post) => {
    const storeId = post.store_id;
    const index = storesPercentage.findIndex(
      (storePercentage) => storePercentage.id === storeId
    );
    const postPercentage = (1 / postsLength) * 100;
    if (index === -1) {
      storesPercentage.push({ id: storeId, percentage: postPercentage });
    } else {
      storesPercentage[index].percentage += postPercentage;
    }
  });

  // const querySnapshot = await getDocs(collection(db, "Store"));

  stores.forEach((store) => {
    const id = store.id;
    const index = storesPercentage.findIndex(
      (storesPercentage) => storesPercentage.id === id
    );
    if (index !== -1) {
      storesPercentage[index].brand = store.brand;
    }
  });

  const brandsPercentage = [];
  storesPercentage.forEach((storePercentage) => {
    const brand = storePercentage.brand;
    const index = brandsPercentage.findIndex(
      (brandPercentage) => brandPercentage.brand === brand
    );
    if (index === -1) {
      brandsPercentage.push({
        brand,
        percentage: storePercentage.percentage,
      });
    } else {
      brandsPercentage[index].percentage += storePercentage.percentage;
    }
  });

  brandsPercentage.sort((a, b) => b.percentage > a.percentage);

  let [top, second, third, ...fourth] = brandsPercentage;
  const placeholders = [
    { brand: "KOI", percentage: 0 },
    { brand: "LiHo", percentage: 0 },
    { brand: "Gong Cha", percentage: 0 },
    { brand: "Playmade", percentage: 0 },
  ];

  if (!top) {
    top = placeholders.shift();
  }
  while (!second || second.brand === top.brand) {
    second = placeholders.shift();
  }
  while (!third || third.brand === top.brand || third.brand === second.brand) {
    third = placeholders.shift();
  }
  if (fourth.length > 1) {
    const othersPercentage = fourth.reduce(
      (sum, current) => sum + current.percentage,
      0
    );
    fourth = { brand: "Others", percentage: othersPercentage };
  } else if (fourth.length === 0) {
    fourth = undefined;
    while (
      !fourth ||
      fourth.brand === top.brand ||
      fourth.brand === second.brand ||
      fourth.brand === third.brand
    ) {
      fourth = placeholders.shift();
    }
  }

  const labels = [top.brand, second.brand, fourth.brand, third.brand];
  const percentages = [
    top.percentage,
    second.percentage,
    fourth.percentage,
    third.percentage,
  ];

  return [labels, percentages];
};

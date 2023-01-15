const sortByDistance = (currentList) => {
  const newList = [...currentList].sort((a, b) => a.distance - b.distance);
  return newList;
};

const sortByRating = (currentList) => {
  const newList = [...currentList].sort((a, b) => b.rating - a.rating);
  return newList;
};

const sortByNumPosts = (currentList) => {
  const newList = [...currentList].sort((a, b) => b.count - a.count);
  return newList;
};

const filterLess1km = (currentList) => {
  const newList = currentList.filter((a) => a.distance < 1);
  return newList;
};
const filterLess2km = (currentList) => {
  const newList = currentList.filter((a) => a.distance < 2);
  return newList;
};
const filterLess5km = (currentList) => {
  const newList = currentList.filter((a) => a.distance < 5);
  return newList;
};
const filterMore5km = (currentList) => {
  const newList = currentList.filter((a) => a.distance > 5);
  return newList;
};

const filterStars = (currentList, filters) => {
  const options = [
    filters.star01,
    filters.star12,
    filters.star23,
    filters.star34,
    filters.star45,
  ];
  if (options.every((item) => !item)) {
    return currentList;
  }
  var newList = [];
  for (var i = 0; i < 5; i++) {
    if (options[i]) {
      const tempList = [];
      for (const item of currentList) {
        if (item.rating >= i && item.rating < i + 1) {
          tempList.push(item);
        }
      }
      newList = newList.concat(tempList);
    }
  }
  return newList;
};

const filterStore = (currentList, filters) => {
  const options = [
    [filters.liho, "LiHO"],
    [filters.chicha, "CHICHA San Chen"],
    [filters.gongcha, "Gong Cha"],
    [filters.koi, "KOI"],
    [filters.playmade, "Playmade"],
  ];
  if (options.every((item) => !item)) {
    return currentList;
  }
  var newList = [];
  for (var i = 0; i < 5; i++) {
    if (options[i][0]) {
      const tempList = [];
      for (const item of currentList) {
        if (options[i][1] == item.brand) {
          tempList.push(item);
        }
      }
      newList = newList.concat(tempList);
    }
  }
  return newList;
};

export {
  sortByDistance,
  sortByRating,
  sortByNumPosts,
  filterLess1km,
  filterLess2km,
  filterLess5km,
  filterMore5km,
  filterStars,
  filterStore,
};

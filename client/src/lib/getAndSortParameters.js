const getAndSortParameters = (pathData) => {
    const favoriteParameters = ["search"];
    const parameters = [];
    
    if (pathData?.get?.parameters && pathData.get.parameters.length > 0) {
        parameters.push(...pathData.get.parameters);
      }
      if (pathData?.parameters && pathData.parameters.length > 0) {
        parameters.push(...pathData.parameters);
      }
      const favoritesInParameters = parameters.filter((parameter) =>
        favoriteParameters.includes(parameter.name)
      );
      const parametersMinusFavorites = parameters.filter((parameter) => {
        let match = 0;
        favoritesInParameters.forEach((fav) => {
          if (fav.name === parameter.name) {
            match++;
          }
        });
        if (match > 0) {
          return false;
        }
        return true;
      });
      return ([
        ...favoritesInParameters,
        ...parametersMinusFavorites,
      ]);
}
export default getAndSortParameters;
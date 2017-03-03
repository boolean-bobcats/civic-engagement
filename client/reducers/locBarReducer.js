export default function locBar(state = {}, action) {
  switch (action.type) {
    case 'Location_Search': {
      const { offices, officials } = action.payload.data;

      const reps = offices
        .filter(office => office.name.slice(0, 13) === 'United States')
        .reduce((acc, index) => acc.concat(index.officialIndices), [])
        .map(i => officials[i]);
        // .reduce((acc, rep) => {
        //   Object.assign(acc, { [rep.name]: rep });
        //   return acc;
        // }, {});

      const district = offices
        .filter(office =>
          office.name.slice(0, 19) === 'United States House')[0].name.slice(39);

      return {
        ...state,
        reps,
        district,
        GoogleResults: action.payload.data
      };
    }
    default:
      return state;
  }
}

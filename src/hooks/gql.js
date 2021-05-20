const gql = (query, variables) => {
  return new Promise((resolve, reject) => {
    fetch('https://circula-gql.herokuapp.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ query, variables })
    })
      .then(blob => blob.json())
      .then(res => {
        if (res.errors) {
          reject(res.errors);
        } else {
          resolve(res.data);
        }
      });
  });
};

export default gql;

fetchSheet
  .fetch({
    gSheetId: "1Ou0lWPoS4saNYh8stySSpJc_A3kw9WgZY8JLPWIbv9M",
    wSheetName: "Trang tính1",
  })
  .then((rows) => {
    // handle responsed data here

    console.log(
        rows
    );
    
  });
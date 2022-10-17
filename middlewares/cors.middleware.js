app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.set("Access-Control-Allow-Methods", "*");
    res.set("Access-Control-Allow-Credentials", "true");
    next();
  });   
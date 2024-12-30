const {
  getProductsFDB,
  postProductFDB,
  deleteProductFDB,
  updateProductFDB,
  postCategoryFDB,
  getCategoryFDB,
  deleteCategoryFDB,
  updateCategoryFDB,
  postSubCategoryFDB,
  deleteSubCategoryFDB,
  getSubCategoryFDB,
  updateSubcategoryFDB,
  getModelFDB,
  getUnitMeasureFDB,
  deleteProductbyProductSubcategoryFDB,
} = require("../routes/api");

const getHomepage = async (req, res, next) => {
  const subCategories = await getSubCategoryFDB();
  const models = await getModelFDB();
  const unitMeasures = await getUnitMeasureFDB()
  res.render("product.ejs", {subCategories: subCategories.recordset, models: models.recordset, unitMeasures: unitMeasures.recordset});
};
// const getProducts = async (req, res) => {
//   try {
//     const page = req.query.page
//     const data = await getProductsFDB(page);
//     console.log(data.recordset)
//     // console.log(JSON.stringify(data.recordsets, null, 2));
//     const subCategories = await getSubCategoryFDB();
//     const models = await getModelFDB();
//     const unitMeasures = await getUnitMeasureFDB()
//     res.render('product.ejs', { listProducts: data.recordset, numOfProduct: data.recordsets[1][0].Total, page: page, subCategories: subCategories.recordset, models: models.recordset, unitMeasures: unitMeasures.recordset })
//   }
//   catch (err) {
//     console.error("Error fetching products: ", err);
//     res.status(500).send("Error fetching products");
//   }
// }
const getProducts = async (request, response, next) => {
  var draw = request.query.draw||1;
  var start = request.query.start||0;
  var length = request.query.length||2;
  const data = await getProductsFDB(start, length);
  // response.json(data.data)

  var output = {
    draw: draw,
    iTotalRecords: data.numOfProduct,
    iTotalDisplayRecords: data.numOfProduct,
    aaData: data.data,
  };
  response.json(output)
  // response.render('product.ejs', {data: JSON.stringify(output), subCategories: subCategories.recordset, models: models.recordset, unitMeasures: unitMeasures.recordset})
};
const postProduct = async (req, res) => {
  // console.log(`param: ${req.query.page}`)
  //console.log(req.body);
  await postProductFDB(req.body);
  res.redirect(`/`);
};
const updateProduct = async (req, res) => {
  //console.log(`makeflag: ${req.body.MakeFlag} googflag: ${req.body.FinishedGoodsFlag}`)
  await updateProductFDB(req.params.ProductID, req.body);
  //console.log(req.params);
  //console.log(req.body);
  res.redirect(`/`);
};
const deleteProduct = async (req, res) => {
  console.log(req.params);
  await deleteProductFDB(req.params.ProductID);
  res.redirect(`/?message=Product deleted successfully`);
};
const getCategory = async (req, res) => {
  try {
    const data = await getCategoryFDB();
    //console.log(data.recordset)
    res.render("category.ejs", { categories: data.recordset });
  } catch (err) {
    console.error("Error fetching category: ", err);
    res.status(500).send("Error fetching categories");
  }
};
const postCategory = async (req, res) => {
  let Name = req.body.Name;
  //console.log('>>>check Name:', Name)
  await postCategoryFDB(Name);
  res.redirect("/category");
};
const deleteCategory = async (req, res) => {
  //await deleteSubCategoryFDB(req.params.ProductCategoryID);
  await deleteCategoryFDB(req.params.ProductCategoryID);
  //console.log(req.params)
  res.redirect("/category/?message=Category deleted successfully");
};
const updateCategory = async (req, res) => {
  await updateCategoryFDB(req.params.ProductCategoryID, req.body.Name);
  //console.log(req.params)
  //console.log(req.body)
  res.redirect("/category");
};
const getSubCategory = async (req, res) => {
  try {
    const data = await getCategoryFDB();
    //console.log('>>>category: ', data.recordset)
    const subCategories = await getSubCategoryFDB();
    res.render("subCategory.ejs", {
      categories: data.recordset,
      subcategories: subCategories.recordset,
    });
  } catch (err) {
    console.error("Error fetching subcategory: ", err);
    res.status(500).send("Error fetching subcategory");
  }
};
const postSubCategory = async (req, res) => {
  let { ProductCategoryID, Name } = req.body;
  console.log(">>>check PId:", ProductCategoryID, ">>>Name:", Name);
  const data = await postSubCategoryFDB(Name, ProductCategoryID);
  res.redirect("/subcategory");
};
const deleteSubcategory = async (req, res) => {
  //await deleteProductbyProductSubcategoryFDB(req.params.ProductSubcategoryID);
  await deleteSubCategoryFDB(req.params.ProductSubcategoryID);
  // console.log(req.params.ProductSubcategoryID)
  res.redirect("/subcategory/?message=Subcategory deleted successfully");
};
const updateSubcategory = async (req, res) => {
  await updateSubcategoryFDB(
    req.params.ProductSubcategoryID,
    req.body.Name,
    req.body.ProductCategoryID
  );
  // console.log(req.params)
  // console.log(req.body)
  res.redirect("/subcategory");
};
const getReport = (req, res) => {
  res.render("report.ejs");
};

module.exports = {
  getHomepage,
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
  getSubCategory,
  postSubCategory,
  deleteSubcategory,
  updateSubcategory,
  getReport,
};

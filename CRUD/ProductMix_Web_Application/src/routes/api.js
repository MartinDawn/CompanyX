var { connection } = require("../config/database");
const sql = require("mssql");

const getProductsFDB = async (start, length) => {
  const pool = await connection();
  const data = await pool.request().query(`select * from Production.Product
            where isDelete=0
            order by ProductID
            OFFSET ${start} ROWS FETCH NEXT ${length} ROWS ONLY;`);
  const Total = await pool.request()
    .query(`select count(*) as Total from Production.Product
            where isDelete=0`);
  const numOfProduct = Total.recordset[0].Total;
  return { data: data.recordset, numOfProduct };
};
const postProductFDB = async (productData) => {
  //console.log(productData)
  const pool = await connection();
  const Name = productData.Name;
  const ProductNumber = productData.ProductNumber;
  const MakeFlag = productData.MakeFlag=== '1';
  const FinishedGoodsFlag = productData.FinishedGoodsFlag=== '1';
  const Color = productData.Color || null;
  const SafetyStockLevel = productData.SafetyStockLevel;
  const ReorderPoint = productData.ReorderPoint;
  const StandardCost = productData.StandardCost;
  const ListPrice = productData.ListPrice;
  const Size = productData.Size || null;
  const SizeUnitMeasureCode = productData.SizeUnitMeasureCode || null;
  const Weight = productData.Weight || null;
  const WeightUnitMeasureCode = productData.WeightUnitMeasureCode || null;
  const DaysToManufacture = productData.DaysToManufacture;
  const ProductLine = productData.ProductLine || null;
  const Class = productData.Class || null;
  const Style = productData.Style || null;
  const ProductSubcategoryID = productData.ProductSubcategoryID || null;
  const ProductModelID = productData.ProductModelID || null;
  const SellStartDate = productData.SellStartDate;
  const SellEndDate = productData.SellEndDate || null;
  const DiscontinuedDate = productData.DiscontinuedDate || null;
  const isDelete = 0;
  await pool
    .request()
    .input("Name", sql.NVarChar, Name)
    .input("ProductNumber", sql.NVarChar(25), ProductNumber)
    .input("MakeFlag", sql.Bit, MakeFlag)
    .input("FinishedGoodsFlag", sql.Bit, FinishedGoodsFlag)
    .input("Color", sql.NVarChar(15), Color)
    .input("SafetyStockLevel", sql.SmallInt, SafetyStockLevel)
    .input("ReorderPoint", sql.SmallInt, ReorderPoint)
    .input("StandardCost", sql.Money, StandardCost)
    .input("ListPrice", sql.Money, ListPrice)
    .input("Size", sql.NVarChar(5), Size)
    .input("SizeUnitMeasureCode", sql.NChar(3), SizeUnitMeasureCode)
    .input("WeightUnitMeasureCode", sql.NChar(3), WeightUnitMeasureCode)
    .input("Weight", sql.Decimal(8, 2), parseFloat(Weight))
    .input("DaysToManufacture", sql.Int, DaysToManufacture)
    .input("ProductLine", sql.NChar(2), ProductLine)
    .input("Class", sql.NChar(2), Class)
    .input("Style", sql.NChar(2), Style)
    .input("ProductSubcategoryID", sql.Int, ProductSubcategoryID)
    .input("ProductModelID", sql.Int, ProductModelID)
    .input("SellStartDate", sql.DateTime, SellStartDate)
    .input("SellEndDate", sql.DateTime, SellEndDate)
    .input("DiscontinuedDate", sql.DateTime, DiscontinuedDate)
    .input("isDelete", sql.Bit, isDelete)
    .query(
      `INSERT INTO [Production].[Product]
                ([Name], [ProductNumber], [MakeFlag], [FinishedGoodsFlag], [Color], [SafetyStockLevel],
                 [ReorderPoint], [StandardCost], [ListPrice], [Size], [SizeUnitMeasureCode], 
                 [WeightUnitMeasureCode], [Weight], [DaysToManufacture], [ProductLine], [Class], 
                 [Style], [ProductSubcategoryID], [ProductModelID], [SellStartDate], [SellEndDate], 
                 [DiscontinuedDate], [rowguid], [ModifiedDate], [isDelete])
             VALUES 
                (@Name, @ProductNumber, @MakeFlag, @FinishedGoodsFlag, @Color, @SafetyStockLevel,
                 @ReorderPoint, @StandardCost, @ListPrice, @Size, @SizeUnitMeasureCode, 
                 @WeightUnitMeasureCode, @Weight, @DaysToManufacture, @ProductLine, @Class, 
                 @Style, @ProductSubcategoryID, @ProductModelID, @SellStartDate, @SellEndDate, 
                 @DiscontinuedDate, NEWID(), GETDATE(), @isDelete)`
    );
};
const updateProductFDB = async (productID, productData) => {
  const pool = await connection();
  const Name = productData.Name;
  const ProductNumber = productData.ProductNumber;
  const MakeFlag = productData.MakeFlag === '1';
  const FinishedGoodsFlag = productData.FinishedGoodsFlag=== '1';
  const Color = productData.Color || null;
  const SafetyStockLevel = productData.SafetyStockLevel;
  const ReorderPoint = productData.ReorderPoint;
  const StandardCost = productData.StandardCost;
  const ListPrice = productData.ListPrice;
  const Size = productData.Size || null;
  const SizeUnitMeasureCode = productData.SizeUnitMeasureCode || null;
  const Weight = productData.Weight || null;
  const WeightUnitMeasureCode = productData.WeightUnitMeasureCode || null;
  const DaysToManufacture = productData.DaysToManufacture;
  const ProductLine = productData.ProductLine || null;
  const Class = productData.Class || null;
  const Style = productData.Style || null;
  const ProductSubcategoryID = productData.ProductSubcategoryID || null;
  const ProductModelID = productData.ProductModelID || null;
  const SellStartDate = productData.SellStartDate;
  const SellEndDate = productData.SellEndDate || null;
  const DiscontinuedDate = productData.DiscontinuedDate || null;
  // console.log(`makeflag ${MakeFlag} goodflag ${FinishedGoodsFlag}`)
  // console.log('MakeFlag:', typeof MakeFlag, MakeFlag);
  console.log(productData)
  await pool
    .request()
    .input("ProductID", sql.Int, productID)
    .input("Name", sql.NVarChar, Name)
    .input("ProductNumber", sql.NVarChar(25), ProductNumber)
    .input("MakeFlag", sql.Bit, MakeFlag)
    .input("FinishedGoodsFlag", sql.Bit, FinishedGoodsFlag)
    .input("Color", sql.NVarChar(15), Color)
    .input("SafetyStockLevel", sql.SmallInt, SafetyStockLevel)
    .input("ReorderPoint", sql.SmallInt, ReorderPoint)
    .input("StandardCost", sql.Money, StandardCost)
    .input("ListPrice", sql.Money, ListPrice)
    .input("Size", sql.NVarChar(5), Size)
    .input("SizeUnitMeasureCode", sql.NChar(3), SizeUnitMeasureCode)
    .input("WeightUnitMeasureCode", sql.NChar(3), WeightUnitMeasureCode)
    .input("Weight", sql.Decimal(8, 2), parseFloat(Weight))
    .input("DaysToManufacture", sql.Int, DaysToManufacture)
    .input("ProductLine", sql.NChar(2), ProductLine)
    .input("Class", sql.NChar(2), Class)
    .input("Style", sql.NChar(2), Style)
    .input("ProductSubcategoryID", sql.Int, ProductSubcategoryID)
    .input("ProductModelID", sql.Int, ProductModelID)
    .input("SellStartDate", sql.DateTime, SellStartDate)
    .input("SellEndDate", sql.DateTime, SellEndDate)
    .input("DiscontinuedDate", sql.DateTime, DiscontinuedDate)
    .query(
      `UPDATE [Production].[Product]
            SET [Name] = @Name,
                [ProductNumber] = @ProductNumber,
                [MakeFlag] = @MakeFlag,
                [FinishedGoodsFlag] = @FinishedGoodsFlag,
                [Color] = @Color,
                [SafetyStockLevel] = @SafetyStockLevel,
                [ReorderPoint] = @ReorderPoint,
                [StandardCost] = @StandardCost,
                [ListPrice] = @ListPrice,
                [Size] = @Size,
                [SizeUnitMeasureCode] = @SizeUnitMeasureCode,
                [WeightUnitMeasureCode] = @WeightUnitMeasureCode,
                [Weight] = @Weight,
                [DaysToManufacture] = @DaysToManufacture,
                [ProductLine] = @ProductLine,
                [Class] = @Class,
                [Style] = @Style,
                [ProductSubcategoryID] = @ProductSubcategoryID,
                [ProductModelID] = @ProductModelID,
                [SellStartDate] = @SellStartDate,
                [SellEndDate] = @SellEndDate,
                [DiscontinuedDate] = @DiscontinuedDate,
                [ModifiedDate] = GETDATE()
            WHERE [ProductID] = @ProductID`
    );
};
const deleteProductFDB = async (ProductID) => {
  const pool = await connection();
  await deleteProductReviewFDB(ProductID);
  await deleteProductPhotoFDB(ProductID);
  await deleteProductDocumentFDB(ProductID);
  const result = await pool
    .request()
    .input("ProductID", sql.Int, ProductID)
    .output("Res", sql.Int)
    .execute("proc_CheckProductIdExist");

  const checkResult = result.output.Res; //1=xoa mem do ton tai
  // console.log(`co the xoa ${checkResult}`)
  if (checkResult == 1) {
    const data = await pool.request().input("ProductID", sql.Int, ProductID)
      .query(`UPDATE [Production].[Product]
                SET [isDelete] = 1
                WHERE [ProductID]=@ProductID`);
  } else {
    const data = await pool.request().input("ProductID", sql.Int, ProductID)
      .query(`DELETE [Production].[Product]
                WHERE [ProductID]=@ProductID`);
  }
};
const deleteProductbyProductSubcategoryFDB = async (ProductSubcategoryID) => {
  const pool = await connection();
  const data = await pool
    .request()
    .input("ProductSubcategoryID", sql.Int, ProductSubcategoryID)
    .query(`UPDATE [Production].[Product]
                SET [isDelete] = 1
                WHERE [ProductSubcategoryID]=@ProductSubcategoryID`);
};

const getCategoryFDB = async () => {
  const pool = await connection();
  const data = await pool.request()
    .query(`SELECT [ProductCategoryID],[Name],[rowguid],[ModifiedDate] FROM [Production].[ProductCategory]
                WHERE [isDelete]=0`);
  return data;
};
const postCategoryFDB = async (Name) => {
  const pool = await connection();
  const data = await pool
    .request()
    .input("Name", sql.NVarChar, Name)
    .query(
      `INSERT INTO [Production].[ProductCategory] ([Name],[rowguid],[ModifiedDate],[isDelete])
            VALUES (@Name, NEWID(),GETDATE(),0)`
    );
};
const updateCategoryFDB = async (ProductCategoryID, Name) => {
  const pool = await connection();
  const data = await pool
    .request()
    .input("ProductCategoryID", sql.Int, ProductCategoryID)
    .input("Name", sql.NVarChar, Name)
    .query(`UPDATE [Production].[ProductCategory]
                SET [Name] = @Name, [ModifiedDate] = GETDATE()
                WHERE ProductCategoryID=@ProductCategoryID`);
};
const deleteCategoryFDB = async (ProductCategoryID) => {
  const pool = await connection();
  const ProductSubcategory = await pool.request()
    .input("ProductCategoryID", sql.Int, ProductCategoryID)
    .query(
      `select count(*) as total from [Production].[ProductSubcategory] where [ProductCategoryID]=@ProductCategoryID`
    );
    console.log('productsub: ', ProductSubcategory.recordset[0].total)
  if (ProductSubcategory.recordset[0].total) {
    const data = await pool
      .request()
      .input("ProductCategoryID", sql.Int, ProductCategoryID)
      .query(`UPDATE [Production].[ProductCategory]
                SET [isDelete]=1
                WHERE [ProductCategoryID]=@ProductCategoryID
              UPDATE [Production].[ProductSubcategory]
                SET [isDelete]=1
                WHERE ProductCategoryID=@ProductCategoryID
              UPDATE [Production].[Product]
                SET [isDelete] = 1
                WHERE [ProductSubcategoryID] in (select ProductSubcategoryID
                                                  from [Production].[ProductSubcategory]
                                                  WHERE ProductCategoryID=@ProductCategoryID)`);
  } else {
    const data = await pool
      .request()
      .input("ProductCategoryID", sql.Int, ProductCategoryID)
      .query(`DELETE FROM [Production].[ProductCategory]
                WHERE [ProductCategoryID]=@ProductCategoryID`);
  }
};
const getSubCategoryFDB = async () => {
  const pool = await connection();
  const data = await pool.request()
    .query(`SELECT CompanyX.Production.ProductSubcategory.ProductSubcategoryID
                    , CompanyX.Production.ProductSubcategory.ProductCategoryID
                    , CompanyX.Production.ProductSubcategory.Name
                    ,CompanyX.Production.ProductSubcategory.rowguid
                    , CompanyX.Production.ProductSubcategory.ModifiedDate
                    , Production.ProductCategory.Name AS ProductCategoryName
                FROM CompanyX.Production.ProductSubcategory JOIN CompanyX.Production.ProductCategory
                    ON CompanyX.Production.ProductSubcategory.ProductCategoryID=CompanyX.Production.ProductCategory.ProductCategoryID
                WHERE CompanyX.Production.ProductSubcategory.isDelete=0`);
  return data;
};
const postSubCategoryFDB = async (Name, ProductCategoryID) => {
  const pool = await connection();
  const data = await pool
    .request()
    .input("ProductCategoryID", sql.INT, ProductCategoryID)
    .input("Name", sql.NVarChar, Name)
    .query(
      `INSERT INTO [Production].[ProductSubcategory] ([ProductCategoryID],[Name],[rowguid],[ModifiedDate], [isDelete])
            VALUES (@ProductCategoryID,@Name, NEWID(),GETDATE(),0)`
    );
};
const deleteSubCategoryFDB = async (ProductSubcategoryID) => {
  const pool = await connection();
  const Product = await pool.request()
    .input("ProductSubcategoryID", sql.Int, ProductSubcategoryID)
    .query(
      `select count(*) as total from [Production].[Product] where [ProductSubCategoryID]=@ProductSubcategoryID`
    );
  if (Product.recordset[0].total) {
    const data = await pool
      .request()
      .input("ProductSubcategoryID", sql.Int, ProductSubcategoryID)
      .query(`UPDATE [Production].[ProductSubcategory]
                SET [isDelete]=1
                WHERE ProductSubcategoryID=@ProductSubcategoryID
              UPDATE [Production].[Product]
                SET [isDelete] = 1
                WHERE [ProductSubcategoryID]=@ProductSubcategoryID`);
  } else {
    const data = await pool
      .request()
      .input("ProductSubcategoryID", sql.Int, ProductSubcategoryID)
      .query(`DELETE FROM [Production].[ProductSubcategory]
                WHERE ProductSubcategoryID=@ProductSubcategoryID`);
  }
};
const updateSubcategoryFDB = async (
  ProductSubcategoryID,
  Name,
  ProductCategoryID
) => {
  const pool = await connection();
  const data = await pool
    .request()
    .input("ProductSubcategoryID", sql.Int, ProductSubcategoryID)
    .input("Name", sql.NVarChar, Name)
    .input("ProductCategoryID", sql.Int, ProductCategoryID)
    .query(`UPDATE [Production].[ProductSubcategory]
                SET [Name]=@Name
                    ,[ProductCategoryID]=@ProductCategoryID
                    , [ModifiedDate] = GETDATE()
                WHERE ProductSubcategoryID=@ProductSubcategoryID`);
};

const getModelFDB = async () => {
  const pool = await connection();
  const data = await pool.request().query(`SELECT [ProductModelID]
                    ,[Name]
                    ,[CatalogDescription]
                    ,[Instructions]
                    ,[rowguid]
                    ,[ModifiedDate]
                FROM [CompanyX].[Production].[ProductModel]`);
  return data;
};

const getUnitMeasureFDB = async () => {
  const pool = await connection();
  const data = await pool.request().query(`SELECT [UnitMeasureCode]
                        ,[Name]
                        ,[ModifiedDate]
                FROM [Production].[UnitMeasure]`);
  return data;
};

const deleteProductReviewFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[ProductReview]
      WHERE ProductID=@ProductID`);
};
const deleteProductDocumentFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[ProductDocument]
      WHERE ProductID=@ProductID`);
};
const deleteProductListPriceHistoryFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[ProductListPriceHistory]
      WHERE ProductID=@ProductID`);
};
const deleteProductPhotoFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[ProductProductPhoto]
      WHERE ProductID=@ProductID`);
};
const deleteProductCostHistoryFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[ProductCostHistory]
      WHERE ProductID=@ProductID`);
};
const deleteProductInventoryFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[ProductInventory]
      WHERE ProductID=@ProductID`);
};
const deleteBillOfMaterialsFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[BillOfMaterials]
      WHERE ComponentID=@ProductID`);
};
const updateNullAssemblyBillOfMaterialsFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`UPDATE [Production].[BillOfMaterials]
   SET [ProductAssemblyID] = NULL
      WHERE ProductAssemblyID=@ProductID`);
};
const deleteWorkOrderFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[WorkOrder]
      WHERE ProductID=@ProductID`);
};
const deleteWorkOrderRoutingFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[WorkOrderRouting]
      WHERE ProductID=@ProductID`);
};
const deleteTransactionHistoryFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Production].[TransactionHistory]
      WHERE ProductID=@ProductID`);
};
const deleteProductVendorFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Purchasing].[ProductVendor]
      WHERE ProductID=@ProductID`);
};
const deletePurchaseOrderDetailFDB = async (ProductID) => {
  const pool = await connection();
  const data = await pool.request().input("ProductID", sql.Int, ProductID)
    .query(`DELETE FROM [Purchasing].[PurchaseOrderDetail]
      WHERE ProductID=@ProductID`);
};

module.exports = {
  getProductsFDB,
  postProductFDB,
  updateProductFDB,
  deleteProductFDB,
  deleteProductbyProductSubcategoryFDB,

  getCategoryFDB,
  postCategoryFDB,
  updateCategoryFDB,
  deleteCategoryFDB,

  getSubCategoryFDB,
  postSubCategoryFDB,
  deleteSubCategoryFDB,
  updateSubcategoryFDB,

  getModelFDB,
  getUnitMeasureFDB,
  //xóa tất
  deleteProductReviewFDB,
  deleteProductPhotoFDB,
  deleteProductDocumentFDB,
  //giữ lại nếu có -> nếu không có -> xóa sp được
  deleteProductListPriceHistoryFDB,
  deleteProductCostHistoryFDB,
  deleteProductInventoryFDB,
  deleteBillOfMaterialsFDB,

  deleteTransactionHistoryFDB,
  deletePurchaseOrderDetailFDB,
  deleteWorkOrderFDB,
  deleteWorkOrderRoutingFDB,

  deleteProductVendorFDB,
  updateNullAssemblyBillOfMaterialsFDB,

  //xóa view -> KHÔNG CẦN XÓA DO VIEW TỰ CẬP NHẬT, CÒN TRƯỜNG HỢP SET ISDELETE THÌ...?, giữ lại specialoffer-> KHÔNG CẦN HIỆN THỰC
  //special và view productand...
};

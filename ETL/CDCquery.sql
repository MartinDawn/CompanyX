USE CompanyX
GO

EXEC sys.sp_cdc_enable_db;

SELECT name, is_cdc_enabled
FROM sys.databases;

USE CompanyX
GO

EXEC sys.sp_cdc_enable_table
	@source_schema = N'Production',
	@source_name = N'Product',
	@role_name = NULL,
	@supports_net_changes = 1
GO

SELECT is_tracked_by_cdc,*
FROM sys.tables;

SELECT *
FROM cdc.change_tables;

SELECT *
FROM dbo.cdc_states_Product;

DECLARE @start_lsn binary(10), @end_lsn binary(10);
SET @start_lsn = sys.fn_cdc_get_min_lsn('Production_Product');
SET @end_lsn = sys.fn_cdc_get_max_lsn();
SELECT * FROM cdc.fn_cdc_get_net_changes_Production_Product(
	@start_lsn,
	@end_lsn,
	N'all with mask'
);
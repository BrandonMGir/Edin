//System.debug(PropertyController.getFeaturedProperties());
//System.debug(PropertyController.getPropertiesWithinDistance());

FilterRequest req = new FilterRequest();
req.search = 'test';
req.sortoption = 'none';
req.type = new List<String>{'0', '1'};
req.features = new List<String>();
req.minprice = 'any';
req.maxprice = 'any';
req.bedrooms = '0';
req.bathrooms = '0';

System.debug(PropertyListingsController.getFilteredProperties(req));
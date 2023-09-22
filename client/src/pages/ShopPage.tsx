import ProductsList from '../components/ProductsList.tsx';
import {observer} from 'mobx-react-lite';
import {useContext, useEffect} from 'react';
import {Context} from '../main.tsx';
import {fetchBrands, fetchProducts, fetchTypes} from '../http/productAPI.ts';
import Pages from '../components/Pages.tsx';
import {PRODUCTS_LIMIT} from '../utils/consts.ts';
import Catalog from '../components/Catalog.tsx';

const ShopPage = observer(() => {
	const {products} = useContext(Context);

	useEffect(() => {
		fetchTypes().then(data => products.setTypes(data));
		fetchBrands().then(data => products.setBrands(data));
		fetchProducts(undefined, undefined, 1, PRODUCTS_LIMIT).then(data => {
			products.setProducts(data.rows);
			products.setTotalCount(data.count);
			products.setLimit(PRODUCTS_LIMIT);
		});
	}, []);

	useEffect(() => {
		fetchProducts(products.selectedType?.id, products.selectedBrand?.id, products.page, PRODUCTS_LIMIT).then(data => {
			products.setProducts(data.rows);
			products.setTotalCount(data.count);
			products.setLimit(PRODUCTS_LIMIT);
		});
	}, [products.page, products.selectedType, products.selectedBrand]);

	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 3000 3000"
				width="3000"
				height="3000"
				preserveAspectRatio="xMidYMid meet"
				style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"
				id="Astronot">
				<defs>clipPath id="__lottie_element_1131">
					<rect width="3000" height="3000" x="0" y="0"/></clipPath><image xmlns:ns1="http://www.w3.org/1999/xlink" ns1:href="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACFCAYAAAB4xEt7AAAKP2lDQ1BBZnRlciBFZmZlY3RzIElDQyBQcm9maWxlAABIiZ2Wd1RT2RaHz703vVCSEIqU0GtoUgJIDb1IkS4qMQkQSsCQACI2RFRwRFGRpggyKOCAo0ORsSKKhQFRsesEGUTUcXAUG5ZJZK0Z37x5782b3x/3fmufvc/dZ+991roAkPyDBcJMWAmADKFYFOHnxYiNi2dgBwEM8AADbADgcLOzQhb4RgKZAnzYjGyZE/gXvboOIPn7KtM/jMEA/5+UuVkiMQBQmIzn8vjZXBkXyTg9V5wlt0/JmLY0Tc4wSs4iWYIyVpNz8ixbfPaZZQ858zKEPBnLc87iZfDk3CfjjTkSvoyRYBkX5wj4uTK+JmODdEmGQMZv5LEZfE42ACiS3C7mc1NkbC1jkigygi3jeQDgSMlf8NIvWMzPE8sPxc7MWi4SJKeIGSZcU4aNkxOL4c/PTeeLxcwwDjeNI+Ix2JkZWRzhcgBmz/x...IAmkL1gf0fX2FADyZdNK1yXwrBetaO8I9j8RAtUt6vMP17hoeIgtVRVB0UIdp5qw8evziDJlhOqDvmyME4EkCubwWe8hAQ3KEx6w++b2OOMN2kroPH7fxZEcVD/evQVIUu4YE3OrXcWYxK2v2TUjesIbGCwFYmyBwoz9wbojP0dZB04UArBODFmf4An/EHverXLdokzXT0ctPMqIAQDii48+VLGkvi/Vb8kf77DqQSqGaN4eQhQ1b8nnmOI6qkIBbf95FIQCbxKBp6jaMCsA025VEcRPrxaDU1G0YniG8o9OLnUkUN7E2ZwB2JG9gJGAd+jxhrUpsGTbQR3dheIBoBq17IoQvbK50YpyB0MzXGrN6Rye/jH2HUTU2i+Gr5RSLxs03XKGtBzS53NkkcRsbn3b6Mk0+dxhLuTCO0P5jjyZzEcIGnimIpRjAv1wEUiJXIBVWfQd0FdjeD7R1vZMrwhF+1b267mNwzcah5T087E5BtTtD+gqkQzqeT30HUieezxBbiMsPwyKMd2jrngghP887QxR0cKPmla9+Ip5Bc0SnkiCa8qwYAIBHL2OAqnqEcAKmqEkl677INpHAXJkjbVdgHKWLSyIEG2RyBgDgw5dTMFUjkSSa4XYZ1u38g6qTY+OtmgDeRxXnIBXJULEcMjsDAPBofw4/h4BdgWks3UG55NuSr2gMzT+WFMs6EgDjKh3D32RyOQPgzB0SECb4n55QvNsFJy7Jf1hHme7ASKBEBL7I7QxAKe5wBWCCto53vfTMJ2bH+DCNQVbcQRLDCmHkDADAw5dTkOG8A/EM4LGsH1QL8wO+VGsM1j9l/ntGAuIzLNn7yzyF9Rg7AwDwqBtneO3hORRN0FqeST5QbYqJIQo6WKg5nr7kLAHoDLycyCpifSgkBgDgw+4AzP9Of6CPAM4kIdxh+E3Q5yiQ91vVnP8D1SQhM8wwkqwAAAAASUVORK5CYII="/></g></g></g></g></svg>
			<div className="mx-10 p-5 bg-neutral-900 rounded-2xl grid grid-rows-6 grid-cols-5">
				<Catalog className="row-span-6 space-y-4"/>
				<ProductsList className="row-span-4 col-span-4"/>
				<Pages className="row-span-1 col-span-4"/>
			</div>

		</div>
	);
});

export default ShopPage;
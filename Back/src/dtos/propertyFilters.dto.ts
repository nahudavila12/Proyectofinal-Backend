import { PropertyType } from "src/propierties/property.entity";

export class PropertyFilters {
    location?: string;
    propertyType?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
}

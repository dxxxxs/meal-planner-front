export interface RecipeAPIResponse {
    from: number
    to: number
    count: number
    _links: Links
    hits: Hit[]
}

export interface RecipeAPIRequest {
    diet?: string[],
    health?: string[],
    cuisineType?: string[],
    mealType?: string[],
    dishType?: string[],
    calories?: string,
    field?: string[]
}

export interface Links {
    self: Self
    next: Next
}

export interface Self {
    href: string
    title: string
}

export interface Next {
    href: string
    title: string
}

export interface Hit {
    recipe: Recipe
    _links: Links2
}

export interface Recipe {
    uri: string
    label: string
    image: string
    images: Images
    source: string
    url: string
    shareAs: string
    yield: number
    dietLabels: string[]
    healthLabels: string[]
    cautions: string[]
    ingredientLines: string[]
    ingredients: Ingredient[]
    calories: number
    glycemicIndex: number
    inflammatoryIndex: number
    totalCO2Emissions: number
    co2EmissionsClass: string
    totalWeight: number
    cuisineType: string[]
    mealType: string[]
    dishType: string[]
    instructions: string[]
    tags: string[]
    externalId: string
    totalNutrients: Nutrient[]
    totalDaily: TotalDaily
    digest: Digest[]
}

export interface Images {
    THUMBNAIL: Thumbnail
    SMALL: Small
    REGULAR: Regular
    LARGE: Large
}

export interface Thumbnail {
    url: string
    width: number
    height: number
}

export interface Small {
    url: string
    width: number
    height: number
}

export interface Regular {
    url: string
    width: number
    height: number
}

export interface Large {
    url: string
    width: number
    height: number
}

export interface Ingredient {
    text: string
    quantity: number
    measure: string
    food: string
    weight: number
    foodId: string
}

export interface Nutrient {
    label: string
    quantity: number
    unit: string
}

export interface TotalDaily {
    additionalProp1: AdditionalProp12
    additionalProp2: AdditionalProp22
    additionalProp3: AdditionalProp32
}

export interface AdditionalProp12 {
    label: string
    quantity: number
    unit: string
}

export interface AdditionalProp22 {
    label: string
    quantity: number
    unit: string
}

export interface AdditionalProp32 {
    label: string
    quantity: number
    unit: string
}

export interface Digest {
    label: string
    tag: string
    schemaOrgTag: string
    total: number
    hasRDI: boolean
    daily: number
    unit: string
    sub: string
}

export interface Links2 {
    self: Self2
    next: Next2
}

export interface Self2 {
    href: string
    title: string
}

export interface Next2 {
    href: string
    title: string
}

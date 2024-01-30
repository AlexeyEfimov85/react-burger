export type ListItem = {
    type: string;
    price: number;
    _id: string;
    key: number | string;
    children?: React.ReactNode;
    name: string;
    image: any;
  }

  export type protection = {
    onlyUnAuth?: boolean;
    component?: any;
  }

  export type Order = {
    status?: string;
    number?: number;
    order: {
      createdAt: string;
      ingredients: string[];
      name: string;
      number: number | string;
      status: string;
      updatedAt: string;
      _id: string;
    }
  }

  export type SelectedOrder = {
      createdAt: string;
      ingredients: string[];
      name: string;
      number: number | string;
      status: string;
      updatedAt: string;
      _id: string;
  } | null

  export type TOrderContent = {
    orderIngredientsIds: string[];
    date: string;
}
  
  export type Orders = {
    orders: {
      createdAt: string;
      ingredients: string[];
      name: string;
      number: number | string;
      status: string;
      updatedAt: string;
      _id: string;
    }[]
  }
  
  export type Ingredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    _id: string;
  }

  export type UserValue = {
    login?: string;
    email: string;
    password: string;
    name: string;
  }
export interface CompanyType {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface GeoType {
    lat: string,
    lng: string
}

export interface UserAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoType
}

export interface UserType {
    id: number,
    name: string,
    username: string,
    email: string,
    address: UserAddress,
    phone: string,
    website: string,
    company: CompanyType
}

export interface ErrorType {
    error: string
} 

export interface UpdateUserModelProps {
    isOpen: boolean,
    closeModal: () => void,
    user: UserType,
    onUpdateUser: (id: number, updatedData: Partial<UserType>) => void
}
import {SetStateAction, createContext, Dispatch} from 'react';

type IsSearched = boolean;
type inputValue = string;
type payload = {}[];
export type reposList = {}[];

export interface InputValueContextInterface {
    inputValue: string,
    setInputValue?: Dispatch<SetStateAction<inputValue>>
}
export interface PayloadContextInterface {
    payload: payload,
    queries: any,
    setPayload?: Dispatch<SetStateAction<payload>>
}
export interface ReposContextInterface {
    reposList: reposList,
    setReposList?: Dispatch<SetStateAction<reposList>>
}
export interface SearchBooleanContextInterface {
    isSearched: IsSearched,
    setIsSearched?: Dispatch<SetStateAction<IsSearched>>
}
export interface SearchPageContextInterface{
    searchInput: InputValueContextInterface,
    searchPayload: PayloadContextInterface,
    searchBoolean: SearchBooleanContextInterface,
    searchRepos: ReposContextInterface
}

export const SearchPageContext = createContext({} as SearchPageContextInterface);
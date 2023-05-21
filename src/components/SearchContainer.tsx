import { SearchForm } from "./SearchContainer/SearchForm";
type SearchContainerProps = {
    styles: React.CSSProperties;
    classNames: string;
};

export const SearchContainer = ({classNames, styles}: SearchContainerProps) =>{
    return (
        <div className={classNames} style={styles}>
            <SearchForm classNames={""} styles={{}}/>
        </div>
    )
};
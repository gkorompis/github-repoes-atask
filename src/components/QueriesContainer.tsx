import QueriesAccordion from "./QueriesContainer/QueriesAccordion";
type QueriesContainerProps = {
    styles: React.CSSProperties;
    classNames: string;
};
export const QueriesContainer = ({classNames, styles}: QueriesContainerProps) =>{ 
    return (
        <div className={classNames} style={styles}>
          <QueriesAccordion/>
        </div>
    )
}
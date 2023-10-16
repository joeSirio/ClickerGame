

export default function ClickerSection(props:any){

    const clickerSectionClick = () => {
        props.handleClick();
    }

    return (
        <div className="clicker-section" onClick={clickerSectionClick}>

        </div>
    )
}
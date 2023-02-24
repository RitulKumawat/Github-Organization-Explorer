const FormatDate = ({date}) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    }
    const formatTime = (date) => {
        const d = new Date(date);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return d.toLocaleTimeString('en-US', options);
    }
    return (
        <>
            {formatDate(date)} - {formatTime(date)}
        </>
    )
}

export default FormatDate;
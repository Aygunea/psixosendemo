export const formatDayAndTime = (time) => {
    if (!time) return { dateString: '', timeString: '' };
    const formattedTime = new Date(time);
    const day = formattedTime.getDate().toString().padStart(2, '0');
    const month = (formattedTime.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedTime.getFullYear().toString().slice(-2);
    const dateString = `${day}.${month}.${year}`;
    const timeString = formattedTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { dateString, timeString };
  };
  
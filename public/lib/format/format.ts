export const format = (relativeDate: any): string => {
  console.log(relativeDate);
  if (typeof relativeDate !== 'string') {
    console.log(`Expected relativeDate to be a string but got ${typeof relativeDate}`);
    relativeDate = relativeDate.toString(); // Convert it to a string
  }

  // Check if relativeDate is a valid date string
  if (!isNaN(Date.parse(relativeDate))) {
    return new Date(relativeDate).toISOString();
  }

  // If relativeDate is 'now', return the current date in ISO format
  if (relativeDate === 'now') {
    return new Date().toISOString();
  }

  // Check if relativeDate starts with 'now-'
  if (relativeDate.startsWith('now-')) {
    const regex = /^now-(\d+)([dwhmysDWHMYS])$/;
    const match = relativeDate.match(regex);
    if (!match) {
      throw new Error(`Invalid relative date format: ${relativeDate}`);
    }

    const amount = parseInt(match[1]);
    const unit = match[2].toUpperCase();
    let milliseconds;

    switch (unit) {
      case 'Y':
        milliseconds = amount * 365 * 24 * 60 * 60 * 1000; // Years
        break;
      case 'W':
        milliseconds = amount * 7 * 24 * 60 * 60 * 1000; // Weeks
        break;
      case 'D':
        milliseconds = amount * 24 * 60 * 60 * 1000; // Days
        break;
      case 'H':
        milliseconds = amount * 60 * 60 * 1000; // Hours
        break;
      case 'M':
        milliseconds = amount * 60 * 1000; // Minutes
        break;
      default:
        throw new Error(`Invalid unit: ${unit}`);
    }

    const date = new Date(Date.now() - milliseconds);
    return date.toISOString();
  }

  console.log(`Unsupported date format: ${relativeDate}`);
  return ''; // Return an empty string in case of unsupported format
};

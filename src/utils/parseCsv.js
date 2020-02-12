const parseCSV = (csvTextContent, newSeparator) => {
	let separator = newSeparator || ',';
	let rows = [];
	let lines = csvTextContent.split('\r\n');

	if (lines.length === 1) {
		lines = csvTextContent.split('\n');
	}

	let headerLine = lines.shift();

	let headers = headerLine.split(separator);

	if (headers.length === 1) {
		throw (' --  CSVParserError: Incorrect separator = "' + separator + '"  --  Could not parse CSV due to incorrect separator or the CSV has only one column  --  Aborting...');
	}
	for (let newLine of lines) {
		let rowValues = newLine.split(separator);
		rows.push(rowValues);
	}

	let json = [];

	for (let rowValues of rows) {
		let record = {};
		rowValues.forEach((val, i) => (record[headers[i]] = val))
		json.push(record);
	}

	return json;
}

export default parseCSV;
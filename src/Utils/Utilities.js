

class Utilities
{
		
	static pad(number, length) 
	{
		var str = '' + number;
		while (str.length < length) {
			str = '0' + str;
		}
		return str;
	}

	static DateToString(date) 
	{
		var yyyy = date.getFullYear().toString();
		var MM = this.pad(date.getMonth() + 1,2);
		var dd = this.pad(date.getDate(), 2);
		var hh = this.pad(date.getHours(), 2);
		var mm = this.pad(date.getMinutes(), 2)
		var ss = this.pad(date.getSeconds(), 2)

		return yyyy + MM + dd+  hh + mm + ss;
	}

	
}

export default Utilities;

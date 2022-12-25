export class ConverterService {
  
  ConvertDate(date: Date){
    date = new Date(date);
    date.setMinutes(date.getMinutes() + 480);
    return date;
  }
}
package com.iiot.voltage.util;


import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by korrakote on 10/28/16.
 */
public class GetValueFromExcelUtil {

    public static BigDecimal getNumberValue(Cell cell){
        BigDecimal valueNumber = null;
        if(null != cell){
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_STRING:
                    valueNumber = new BigDecimal(cell.getRichStringCellValue().getString());
                    break;
                case Cell.CELL_TYPE_NUMERIC:
                    valueNumber = new BigDecimal(cell.getNumericCellValue());
                    break;
            }
        }
        return valueNumber;
    }

    public static Date getDateValue(Cell cell){
        Date valueDate = null;
        if(null != cell){
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
                        valueDate = cell.getDateCellValue();
                    } else {
                        valueDate = null;
                    }
                    break;
            }
        }
        return valueDate;
    }


    public static String getStringValue(Cell cell) {
        String valueString = "";
        if (null != cell) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_STRING:
                    valueString = String.valueOf(cell.getRichStringCellValue().getString());
                    break;
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
                        valueString = String.valueOf(cell.getDateCellValue());
                    } else {
                        valueString = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    valueString = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    valueString = String.valueOf(cell.getCellFormula());
                    break;
                default:
            }
        }
        return valueString;
    }
}
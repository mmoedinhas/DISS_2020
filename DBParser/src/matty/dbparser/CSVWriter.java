package matty.dbparser;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class CSVWriter {

    private String pathname;
    private String separator;
    private FileWriter csvWriter;

    public CSVWriter(String parentPath, String separator) throws IOException {
        this.pathname = parentPath + "/results.csv";
        this.separator = separator;
        this.csvWriter = new FileWriter(this.pathname);
    }

    public void writeRow(List<String> rowData) throws IOException {
        csvWriter.append(String.join(separator, rowData));
        csvWriter.append("\n");
    }

    public void close() throws IOException {
        csvWriter.flush();
        csvWriter.close();
    }
}

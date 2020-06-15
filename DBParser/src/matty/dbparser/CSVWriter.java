package matty.dbparser;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class CSVWriter {

    private String pathname;
    private FileWriter csvWriter;

    public CSVWriter(String parentPath) throws IOException {
        this.pathname = parentPath + "/results.csv";
        this.csvWriter = new FileWriter(this.pathname);
    }

    public void writeRow(List<String> rowData) throws IOException {
        csvWriter.append(String.join(";", rowData));
        csvWriter.append("\n");
    }

    public void close() throws IOException {
        csvWriter.flush();
        csvWriter.close();
    }
}

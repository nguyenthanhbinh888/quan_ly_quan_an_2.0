package com.restaurant.dto.response;

public class FileUploadResponse {

    private String url;
    private String filename;
    private String originalFilename;
    private long size;
    private String contentType;

    public FileUploadResponse() {
    }

    public FileUploadResponse(String url, String filename, String originalFilename, long size, String contentType) {
        this.url = url;
        this.filename = filename;
        this.originalFilename = originalFilename;
        this.size = size;
        this.contentType = contentType;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}

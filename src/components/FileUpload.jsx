import React, { useState, useRef } from 'react';
import { Form, Col, Image } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';

const baseUploaderStyles = {
  border: '2px dashed #ddd',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  position: 'relative',
  overflow: 'hidden',
};

const FileUpload = ({
  controlId,
  label,
  uploadText,
  subText,
  onFileSelect,
  accept,
  showPreview = false,
  shape = 'square',
  height = '150px',
  colProps = { md: 4 },
  icon = <FaCamera size={30} className="text-muted mb-2" />,
}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const uploaderStyles = {
    ...baseUploaderStyles,
    height,
    borderRadius: shape === 'circle' ? '50%' : '10px',
    width: shape === 'circle' ? height : '100%',
  };

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect?.(selectedFile);

      if (showPreview && selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const renderContent = () => {
    if (showPreview && previewUrl) {
      return (
        <Image
          src={previewUrl}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      );
    }

    if (file) {
      return <span>{file.name}</span>;
    }

    return (
      <>
        {icon}
        <span>{uploadText}</span>
        {subText && <small className="text-muted">{subText}</small>}
      </>
    );
  };

  return (
    <Col {...colProps} className="d-flex flex-column align-items-center">
      <Form.Group controlId={controlId} className="w-100">
        {label && (
          <Form.Label className="text-muted small text-center d-block">
            {label}
          </Form.Label>
        )}
        <div style={uploaderStyles} onClick={handleContainerClick}>
          <Form.Control
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept={accept}
          />
          {renderContent()}
        </div>
      </Form.Group>
    </Col>
  );
};

export default FileUpload; 
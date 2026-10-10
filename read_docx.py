import zipfile
import xml.etree.ElementTree as ET
import sys
import io

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as docx:
            tree = ET.XML(docx.read('word/document.xml'))
            WORD_NAMESPACE = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
            PARA = WORD_NAMESPACE + 'p'
            TEXT = WORD_NAMESPACE + 't'
            
            text_lines = []
            for paragraph in tree.iter(PARA):
                texts = [node.text for node in paragraph.iter(TEXT) if node.text]
                if texts:
                    text_lines.append(''.join(texts))
            return '\n'.join(text_lines)
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    text = extract_text_from_docx(sys.argv[1])
    with io.open("docx_output.txt", "w", encoding="utf-8") as f:
        f.write(text)

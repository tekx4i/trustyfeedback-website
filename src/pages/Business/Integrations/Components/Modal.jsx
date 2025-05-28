import toast from "react-hot-toast";
import { BsCopy } from "react-icons/bs";
const IntegrationModal = () => {
  const embedCode = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
<script src="http://192.168.88.57:3000/public/businessInfo.js" data-business-id="bfd0a08d-06a4-4554-8011-07edcf48740e"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      toast.success("Embed code copied to clipboard!");
    });
  };

  return (
    <div className="modal fade" id="integrationModal" tabIndex="-1" aria-labelledby="integrationModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-4">
          <div style={{ marginBottom: -20 }} className="modal-header border-0">
            <h4 className="modal-title fw-bold" id="integrationModalLabel">
              Integration
            </h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <p>
              To integrate the rating widget into your website, create a <code>&lt;div&gt;</code> element with the ID <strong>"rating-widget"</strong>. Then, add the script provided below to load the widget.
            </p>

            <div className="integration-embed p-3 bg-light border rounded mt-3 position-relative">
              <strong>Embed Code:</strong>
              <BsCopy style={{ cursor: "pointer" }} className="copy-icon position-absolute top-0 end-0 m-3 cursor-pointer" size={20} onClick={copyToClipboard} title="Copy to clipboard" />
              <pre className="bg-white p-2 rounded border mt-2">
                <code>{embedCode}</code>
              </pre>
            </div>
          </div>

          <div className="modal-footer border-0">
            <button type="button" className="default__btn" data-bs-dismiss="modal">
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;

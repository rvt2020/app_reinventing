
/**
 * Quasar QUploaderBase component
 *
 * @see {@link https://v1.quasar-framework.org/vue-components/uploader-base|Quasar Docs} (Generated link, may not always work)
 */
export default {
  name: 'QUploaderBase',
  props: {
    /**
     * Emitted after files are picked and some do not pass the validation props (accept, max-file-size, max-total-size, filter, etc)
     * @param {Array} rejectedEntries Array of { failedPropValidation: string, file: File } Objects for files that do not pass the validation
     */
    '@rejected': function (rejectedEntries) {},

    /**
     * Emitted when files are added into the list
     * @param {Array} files Array of files that were added
     */
    '@added': function (files) {},

    /**
     * Emitted when files are removed from the list
     * @param {Array} files Array of files that were removed
     */
    '@removed': function (files) {},

    /**
     * Started working

     */
    '@start': function () {},

    /**
     * Finished working (regardless of success or fail)

     */
    '@finish': function () {},
    /**
     * Allow multiple file uploads
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
    },
    /**
     * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
     * @type {String}
     */
    accept: {
      type: String,
    },
    /**
     * Optionally, specify that a new file should be captured, and which device should be used to capture that new media of a type defined by the 'accept' prop. Maps to 'capture' attribute of native input type=file element
     * @type {'user'|'environment'}
     */
    capture: {
      type: String,
    },
    /**
     * Optionally, specify that a new file should be captured, and which device should be used to capture that new media of a type defined by the 'accept' prop. Maps to 'capture' attribute of native input type=file element
     * @type {'user'|'environment'}
     */
    'capture="user"': {
      type: Boolean,
    },
    /**
     * Optionally, specify that a new file should be captured, and which device should be used to capture that new media of a type defined by the 'accept' prop. Maps to 'capture' attribute of native input type=file element
     * @type {'user'|'environment'}
     */
    'capture="environment"': {
      type: Boolean,
    },
    /**
     * Maximum size of individual file in bytes
     * @type {Number|String}
     */
    maxFileSize: {
      type: [Number,String],
    },
    /**
     * Maximum size of all files combined in bytes
     * @type {Number|String}
     */
    maxTotalSize: {
      type: [Number,String],
    },
    /**
     * Maximum number of files to contain
     * @type {Number|String}
     */
    maxFiles: {
      type: [Number,String],
    },
    /**
     * Custom filter for added files; Only files that pass this filter will be added to the queue and uploaded; For best performance, reference it from your scope and do not define it inline
     * @type {Function}
     */
    filter: {
      type: Function,
    },
    /**
     * Label for the uploader
     * @type {String}
     */
    label: {
      type: String,
    },
    /**
     * Color name for component from the Quasar Color Palette
     * @type {String}
     */
    color: {
      type: String,
    },
    /**
     * Overrides text color (if needed); Color name from the Quasar Color Palette
     * @type {String}
     */
    textColor: {
      type: String,
    },
    /**
     * Notify the component that the background is a dark color
     * @type {Boolean}
     */
    dark: {
      type: Boolean,
    },
    /**
     * Removes border-radius so borders are squared
     * @type {Boolean}
     */
    square: {
      type: Boolean,
    },
    /**
     * Applies a 'flat' design (no default shadow)
     * @type {Boolean}
     */
    flat: {
      type: Boolean,
    },
    /**
     * Applies a default border to the component
     * @type {Boolean}
     */
    bordered: {
      type: Boolean,
    },
    /**
     * Don't display thumbnails for image files
     * @type {Boolean}
     */
    noThumbnails: {
      type: Boolean,
    },
    /**
     * Upload files immediately when added
     * @type {Boolean}
     */
    autoUpload: {
      type: Boolean,
    },
    /**
     * Don't show the Upload button
     * @type {Boolean}
     */
    hideUploadBtn: {
      type: Boolean,
    },
    /**
     * Put component in disabled mode
     * @type {Boolean}
     */
    disable: {
      type: Boolean,
    },
    /**
     * Put component in readonly mode
     * @type {Boolean}
     */
    readonly: {
      type: Boolean,
    }
  }
}

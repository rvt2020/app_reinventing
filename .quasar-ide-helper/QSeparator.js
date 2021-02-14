
/**
 * Quasar QSeparator component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/separator|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QSeparator',
  props: {
    /**
     * Notify the component that the background is a dark color
     * @type {Boolean}
     */
    dark: {
      type: Boolean,
    },
    /**
     * If set to true, the corresponding direction margins will be set to 8px; It can also be set to a size in CSS units, including unit name, or one of the xs|sm|md|lg|xl predefined sizes
     * @type {Boolean|String}
     */
    spaced: {
      type: [Boolean,String],
    },
    /**
     * if set to true, the left and right margins will be set to 16px. If set to item, the left and right margins will be set to 72px. If set to item-thumbnail, the left margin is set to 116px and right margin is set to 0px
     * @type {Boolean|String}
     */
    inset: {
      type: [Boolean,String],
    },
    /**
     * If set to true, the separator will be vertical.
     * @type {Boolean}
     */
    vertical: {
      type: Boolean,
    },
    /**
     * Size in CSS units, including unit name
     * @type {String}
     */
    size: {
      type: String,
    },
    /**
     * Color name for component from the Quasar Color Palette
     * @type {String}
     */
    color: {
      type: String,
    }
  }
}

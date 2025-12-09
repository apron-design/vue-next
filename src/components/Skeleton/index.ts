import AdSkeleton from './Skeleton.vue'
import AdSkeletonElement from './SkeletonElement.vue'
import AdSkeletonAvatar from './SkeletonAvatar.vue'
import AdSkeletonTitle from './SkeletonTitle.vue'
import AdSkeletonParagraph from './SkeletonParagraph.vue'
import AdSkeletonButton from './SkeletonButton.vue'
import AdSkeletonImage from './SkeletonImage.vue'

// 将子组件作为静态属性附加到主组件上，以保持与 React 版本 API 一致
;(AdSkeleton as any).Element = AdSkeletonElement
;(AdSkeleton as any).Avatar = AdSkeletonAvatar
;(AdSkeleton as any).Title = AdSkeletonTitle
;(AdSkeleton as any).Paragraph = AdSkeletonParagraph
;(AdSkeleton as any).Button = AdSkeletonButton
;(AdSkeleton as any).Image = AdSkeletonImage

export { AdSkeleton, AdSkeletonElement, AdSkeletonAvatar, AdSkeletonTitle, AdSkeletonParagraph, AdSkeletonButton, AdSkeletonImage }
export default AdSkeleton
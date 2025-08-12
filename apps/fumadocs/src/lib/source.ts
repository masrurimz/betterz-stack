import { loader } from 'fumadocs-core/source';
// biome-ignore lint/performance/noNamespaceImport: need for static icons
import * as icons from 'lucide-static';
import { create, docs } from '../../source.generated';

export const source = loader({
  source: await create.sourceAsync(docs.doc, docs.meta),
  baseUrl: '/docs',
  // @ts-expect-error -- string
  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in icons) {
      // biome-ignore lint/performance/noDynamicNamespaceImportAccess: required for fumadocs dynamic icon access
      return icons[icon as keyof typeof icons];
    }
  },
});

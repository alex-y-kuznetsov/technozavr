import eventBus from '@/eventBus';

export default function goToPage(pageName, pageParams) {
  eventBus.$emit('go-to-page', pageName, pageParams);
}

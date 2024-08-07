import CanvasNodeRenderer from '@/components/canvas/elements/nodes/CanvasNodeRenderer.vue';
import { createComponentRenderer } from '@/__tests__/render';
import { createCanvasNodeProvide } from '@/__tests__/data';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';

const renderComponent = createComponentRenderer(CanvasNodeRenderer);

beforeEach(() => {
	const pinia = createTestingPinia();
	setActivePinia(pinia);
});

describe('CanvasNodeRenderer', () => {
	it('should render default node correctly', async () => {
		const { getByTestId } = renderComponent({
			global: {
				provide: {
					...createCanvasNodeProvide(),
				},
			},
		});

		expect(getByTestId('canvas-node-default')).toBeInTheDocument();
	});

	it('should render configuration node correctly', async () => {
		const { getByTestId } = renderComponent({
			global: {
				provide: {
					...createCanvasNodeProvide({
						data: {
							renderType: 'configuration',
						},
					}),
				},
			},
		});

		expect(getByTestId('canvas-node-configuration')).toBeInTheDocument();
	});

	it('should render configurable node correctly', async () => {
		const { getByTestId } = renderComponent({
			global: {
				provide: {
					...createCanvasNodeProvide({
						data: {
							renderType: 'configurable',
						},
					}),
				},
			},
		});

		expect(getByTestId('canvas-node-configurable')).toBeInTheDocument();
	});
});

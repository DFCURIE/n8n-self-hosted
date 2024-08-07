import CanvasNodeConfigurable from '@/components/canvas/elements/nodes/render-types/CanvasNodeConfigurable.vue';
import { createComponentRenderer } from '@/__tests__/render';
import { NodeConnectionType } from 'n8n-workflow';
import { createCanvasNodeProvide } from '@/__tests__/data';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';

const renderComponent = createComponentRenderer(CanvasNodeConfigurable);

beforeEach(() => {
	const pinia = createTestingPinia();
	setActivePinia(pinia);
});

describe('CanvasNodeConfigurable', () => {
	it('should render node correctly', () => {
		const { getByText } = renderComponent({
			global: {
				provide: {
					...createCanvasNodeProvide(),
				},
			},
		});

		expect(getByText('Test Node')).toBeInTheDocument();
	});

	describe('selected', () => {
		it('should apply selected class when node is selected', () => {
			const { getByText } = renderComponent({
				global: {
					provide: {
						...createCanvasNodeProvide({
							selected: true,
						}),
					},
				},
			});
			expect(getByText('Test Node').closest('.node')).toHaveClass('selected');
		});

		it('should not apply selected class when node is not selected', () => {
			const { getByText } = renderComponent({
				global: {
					provide: {
						...createCanvasNodeProvide(),
					},
				},
			});
			expect(getByText('Test Node').closest('.node')).not.toHaveClass('selected');
		});
	});

	describe('disabled', () => {
		it('should apply disabled class when node is disabled', () => {
			const { getByText } = renderComponent({
				global: {
					provide: {
						...createCanvasNodeProvide({
							data: {
								disabled: true,
							},
						}),
					},
				},
			});

			expect(getByText('Test Node').closest('.node')).toHaveClass('disabled');
			expect(getByText('(Deactivated)')).toBeVisible();
		});

		it('should not apply disabled class when node is enabled', () => {
			const { getByText } = renderComponent({
				global: {
					provide: {
						...createCanvasNodeProvide(),
					},
				},
			});
			expect(getByText('Test Node').closest('.node')).not.toHaveClass('disabled');
		});
	});

	describe('inputs', () => {
		it('should adjust width css variable based on the number of non-main inputs', () => {
			const { getByText } = renderComponent({
				global: {
					provide: {
						...createCanvasNodeProvide({
							data: {
								inputs: [
									{ type: NodeConnectionType.Main },
									{ type: NodeConnectionType.AiTool },
									{ type: NodeConnectionType.AiDocument, required: true },
									{ type: NodeConnectionType.AiMemory, required: true },
								],
							},
						}),
					},
				},
			});

			const nodeElement = getByText('Test Node').closest('.node');
			expect(nodeElement).toHaveStyle({ '--configurable-node-input-count': '3' });
		});
	});
});

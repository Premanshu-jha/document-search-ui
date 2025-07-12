import { Component, h, State } from '@stencil/core';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

@Component({
  tag: 'document-search',
  styleUrl: 'document-search.css',
  shadow: false,
})
export class DocumentSearch {
  @State() referenceId: string = '';
  @State() applicantId: string = '';
  @State() assetId: string = '';
  @State() facilityId: string = '';
  @State() documentStage: string = '';
  @State() additionalAttribute: string = '';

  private documentNamesSelectEl!: HTMLSelectElement;
  private documentEntitySelectEl!: HTMLSelectElement;
  private documentNamesChoices!: Choices;
  private documentEntityChoices!: Choices;

  componentDidLoad() {
  this.initializeChoices();
}

initializeChoices() {
  // Clear previous instances if they exist
  if (this.documentNamesChoices) {
    this.documentNamesChoices.destroy();
  }

  if (this.documentEntityChoices) {
    this.documentEntityChoices.destroy();
  }

  // Re-initialize Document Names
  this.documentNamesChoices = new Choices(this.documentNamesSelectEl, {
    removeItemButton: true,
    placeholder: true,
    placeholderValue: 'Select document names',
    shouldSort: false,
  });

  this.documentNamesChoices.setChoices([
    { value: 'PAN Card', label: 'PAN Card' },
    { value: 'Aadhar Card', label: 'Aadhar Card' },
    { value: 'Driving License', label: 'Driving License' },
    { value: 'Application Form', label: 'Application Form' },
    { value: 'Passport', label: 'Passport' },
  ], 'value', 'label', true);

  // Re-initialize Document Entities
  this.documentEntityChoices = new Choices(this.documentEntitySelectEl, {
    removeItemButton: true,
    placeholder: true,
    placeholderValue: 'Select document entity',
    shouldSort: false,
  });

  this.documentEntityChoices.setChoices([
    { value: 'ENTITY A', label: 'ENTITY A' },
    { value: 'ENTITY B', label: 'ENTITY B' },
    { value: 'FACILITY', label: 'FACILITY' },
  ], 'value', 'label', true);
}


  handleInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this[field] = target.value;
  }

  handleSelectChange(event: Event, field: string) {
    const target = event.target as HTMLSelectElement;
    this[field] = target.value;
  }

  handleSearch() {
    const selectedDocumentNames = this.documentNamesChoices.getValue(true);
    const selectedDocumentEntities = this.documentEntityChoices.getValue(true);

    console.log('Search triggered with values:', {
      referenceId: this.referenceId,
      applicantId: this.applicantId,
      assetId: this.assetId,
      facilityId: this.facilityId,
      documentStage: this.documentStage,
      additionalAttribute: this.additionalAttribute,
      documentNames: selectedDocumentNames,
      documentEntity: selectedDocumentEntities,
    });
  }

  handleReset() {
    this.referenceId = '';
    this.applicantId = '';
    this.assetId = '';
    this.facilityId = '';
    this.documentStage = '';
    this.additionalAttribute = '';
    this.documentNamesChoices.clearStore();
    this.documentEntityChoices.clearStore();
  }

  render() {
    return (
      <div class="container">
        <h2 class="title">
          <span class="icon">🔍</span> Document Search
        </h2>
        <p class="description">
          Search and retrieve documents using multiple criteria.
        </p>

        <div class="grid">
          <input
            type="text"
            placeholder="Enter reference ID"
            value={this.referenceId}
            onInput={e => this.handleInputChange(e, 'referenceId')}
            class="input"
          />
          <input
            type="text"
            placeholder="Enter applicant ID"
            value={this.applicantId}
            onInput={e => this.handleInputChange(e, 'applicantId')}
            class="input"
          />
          <input
            type="text"
            placeholder="Enter asset ID"
            value={this.assetId}
            onInput={e => this.handleInputChange(e, 'assetId')}
            class="input"
          />
          <input
            type="text"
            placeholder="Enter facility ID"
            value={this.facilityId}
            onInput={e => this.handleInputChange(e, 'facilityId')}
            class="input"
          />

          <select
            onInput={e => this.handleSelectChange(e, 'documentStage')}
            class="input"
          >
            <option value="">Select document stage</option>
            <option value="Draft">Draft</option>
            <option value="Final">Final</option>
          </select>

          {/* Document Names Multi-Select */}
          <select ref={el => (this.documentNamesSelectEl = el)} multiple></select>

          {/* Document Entity Multi-Select */}
          <select ref={el => (this.documentEntitySelectEl = el)} multiple></select>

          <select
            onInput={e => this.handleSelectChange(e, 'additionalAttribute')}
            class="input"
          >
            <option value="">Select attribute</option>
            <option value="DateCreated">Date Created</option>
            <option value="Owner">Owner</option>
          </select>
        </div>

        <div class="button-row">
          <button onClick={() => this.handleSearch()} class="btn-primary">
            Search Documents
          </button>
          <button onClick={() => this.handleReset()} class="btn-secondary">
            Reset Form
          </button>
        </div>
      </div>
    );
  }
}

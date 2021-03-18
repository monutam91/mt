module.exports = {
    name: 'coffee-quiz',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/coffee-quiz',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};

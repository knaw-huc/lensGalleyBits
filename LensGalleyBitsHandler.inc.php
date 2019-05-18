<?php

/**
 * @file plugins/generic/LensGalleyBits/LensGalleyBitsHandler.inc.php
 *
 * Copyright (c) 2014-2018 Simon Fraser University
 * Copyright (c) 2003-2018 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @class LensGalleyBitsHandler
 * @ingroup plugins_generic_LensGalleyBits
 *
 * @brief Handle requests for LensGalleyBits plugin
 */

import('classes.handler.Handler');

class LensGalleyBitsHandler extends Handler {


	/**
	 * display images attached to XML document
	 *
	 * @param $args array
	 * @param $request PKPRequest
	 *
	 * @return void
	 */
	public function media($args, $request) {

		$galleyId = $request->getUserVar('fileId');
		$submissionId = $request->getUserVar('submissionId');


		$galleyDao = DAORegistry::getDAO('ArticleGalleyDAO');
		$galley = $galleyDao->getByBestGalleyId($galleyId, $submissionId);
		$submissionFile = $galley->getFile();
		if (!$submissionFile) {
			fatalError('Invalid request');
		}

		import('lib.pkp.classes.submission.SubmissionFile'); // Constants
		$submissionFileDao = DAORegistry::getDAO('SubmissionFileDAO');

		$dependentFiles = $submissionFileDao->getLatestRevisionsByAssocId(
			ASSOC_TYPE_SUBMISSION_FILE,
			$submissionFile->getFileId(),
			$submissionFile->getSubmissionId(),
			SUBMISSION_FILE_DEPENDENT
		);


		// make sure this is an xml document
		if (!in_array($submissionFile->getFileType(), array('text/xml', 'application/xml'))) {
			fatalError('Invalid request');
		}

		$mediaSubmissionFile = null;
		foreach ($dependentFiles as $dependentFile) {
			if ($dependentFile->getOriginalFileName() == $request->getUserVar('fileName')) {
				$mediaSubmissionFile = $dependentFile;
				break;
			}
		}

		if (!$mediaSubmissionFile) {
			$request->getDispatcher()->handle404();
		}

		$filePath = $mediaSubmissionFile->getFilePath();
		header('Content-Type:' . $mediaSubmissionFile->getFileType());
		header('Content-Length: ' . $mediaSubmissionFile->getFileSize());
		readfile($filePath);
	}


}
